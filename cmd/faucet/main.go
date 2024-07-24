package main

import (
	"html/template"
	"io"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	log "github.com/rs/zerolog"
)

const totalPercent = 100

type Templates struct {
	templates *template.Template
}

func (t *Templates) Render(w io.Writer, name string, data interface{}, _ echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

func newTemplate() *Templates {
	return &Templates{
		templates: template.Must(template.ParseGlob("templates/*.html")),
	}
}

// these will be set as WARD not uWARD.
type Data struct {
	TokensAvailable        float64
	TokensAvailablePercent float64
	TokenSupply            float64
	Denom                  string
	TXHash                 string
}

func newData() Data {
	return Data{
		TokensAvailable:        0,
		TokensAvailablePercent: 0,
		TokenSupply:            0,
		Denom:                  "",
		TXHash:                 "",
	}
}

type FormData struct {
	Address   string
	CSRFToken string
	Errors    map[string]string
}

func newFormData() FormData {
	return FormData{
		Address:   "",
		CSRFToken: "",
		Errors:    make(map[string]string),
	}
}

type Page struct {
	Data Data
	Form FormData
}

func newPage() Page {
	return Page{
		Data: newData(),
		Form: newFormData(),
	}
}

func main() {
	e := echo.New()
	logger := log.New(
		log.ConsoleWriter{Out: os.Stderr, TimeFormat: time.RFC3339},
	).Level(log.InfoLevel).With().Timestamp().Logger()

	page := newPage()
	e.Renderer = newTemplate()
	e.Use(middleware.Logger())

	f, err := InitFaucet(logger)
	if err != nil {
		e.Logger.Fatal(err)
	}

	// HTML Variables
	page.Data = Data{
		TokensAvailable:        f.TokensAvailable,
		TokensAvailablePercent: totalPercent,
		TokenSupply:            f.TokensAvailable,
		Denom:                  f.config.Denom,
	}
	amount, err := strconv.Atoi(f.config.Amount)
	if err != nil {
		logger.Error().Msgf("error converting amount to integer: %s", err)
	}

	// Start batch process
	go f.batchProcessInterval()

	// Start refresh interval
	go f.DailyRefresh()

	e.Static("/assets", "assets")
	e.File("/css/style.css", "css/style.css")
	e.File("/js/tx.js", "js/tx.js")
	e.File("/js/circle.js", "js/circle.js")

	e.GET("/", func(c echo.Context) error {
		csrfToken, _ := c.Get(middleware.DefaultCSRFConfig.ContextKey).(string)
		page.Form.CSRFToken = csrfToken
		return c.Render(http.StatusOK, "index", page)
	})

	e.GET("/check-tx", func(c echo.Context) error {
		logger.Info().Msg("checking tx")
		logger.Info().Msgf("f.Batch: %v", f.Batch)
		if len(f.Batch) == 0 {
			page.Data.TXHash = f.LatestTXHash
			return c.Render(http.StatusOK, "tx-result", page.Data)
		}
		return c.Render(http.StatusOK, "spinner", "")
	})

	e.POST("/send-tokens", func(c echo.Context) error {
		var txHash string
		var httpStatusCode int

		txHash, httpStatusCode, err = f.Send(c.FormValue("address"), false)
		if err != nil {
			logger.Error().Msgf("error sending tokens: %s", err)
			formData := newFormData()
			formData.Address = ""
			formData.Errors["address"] = err.Error()

			return c.Render(httpStatusCode, "form", formData)
		}
		if txHash != "" {
			page.Data.TokensAvailable -= float64(amount)
			page.Data.TokensAvailablePercent = page.Data.TokensAvailable / page.Data.TokenSupply * totalPercent
			logger.Info().Msgf("txHash: %s", txHash)
			return c.Render(http.StatusOK, "form", nil)
		}
		return c.Render(http.StatusOK, "tx-status", "")
	})

	e.GET("/update-tokens", func(c echo.Context) error {
		page.Data.TokensAvailable = f.TokensAvailable
		page.Data.TokensAvailablePercent = f.TokensAvailable / page.Data.TokenSupply * totalPercent

		if page.Data.TokensAvailable <= 0 {
			return c.Render(http.StatusOK, "red-cross", "")
		}
		return c.Render(http.StatusOK, "tokens-section", page.Data)
	})

	logger.Fatal().Err(e.Start(":8081"))
}
