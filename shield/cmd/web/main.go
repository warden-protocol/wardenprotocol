package main

import (
	"html/template"
	"log"
	"net/http"
	"slices"

	"github.com/warden-protocol/wardenprotocol/shield/internal/evaluator"
	"github.com/warden-protocol/wardenprotocol/shield/internal/lexer"
	"github.com/warden-protocol/wardenprotocol/shield/internal/parser"
	"github.com/warden-protocol/wardenprotocol/shield/object"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		/// ignore favicon
		if r.URL.Path != "/" {
			http.NotFound(w, r)
			return
		}

		definition := r.URL.Query().Get("definition")
		isApprover := func(p string) bool {
			return r.URL.Query().Get(p) == "on"
		}

		l := lexer.New(definition)
		p := parser.New(l)
		expression := p.Parse()

		// first pass to gather all participants
		gather := &mockEnvironment{store: make(map[string]struct{})}
		_ = evaluator.Eval(expression, gather)
		fullParticipants := make([]string, 0, len(gather.store))
		for p := range gather.store {
			fullParticipants = append(fullParticipants, p)
		}
		slices.Sort(fullParticipants)

		// second pass to evaluate the definition
		env := object.NewEnvironment()
		for _, p := range fullParticipants {
			if isApprover(p) {
				env.Set(p, object.TRUE)
			} else {
				env.Set(p, object.FALSE)
			}
		}
		evaluated := evaluator.Eval(expression, env)

		tmpl := template.Must(template.New("index").Funcs(template.FuncMap{
			"IsApprover": isApprover,
		}).Parse(`
<!DOCTYPE html>
<html>
    <head>
        <title>Shield</title>
        <style>
            html, body {
                font-family: Arial, sans-serif;
            }

            main {
                max-width: 500px;
                margin: auto;
            }

            form {
                width: 100%;
            }

            input[type="checkbox"] {
                width: 20px;
                height: 20px;
            }

            input[type="text"] {
                width: 100%;
                padding: 12px 20px;
                margin: 8px 0;
                display: inline-block;
                border: 1px solid #ccc;
                box-sizing: border-box;
                font-size: 16px;
                font-family: monospace;
            }

            button {
                background-color: #4CAF50;
                color: white;
                padding: 14px 20px;
                margin: 8px 0;
                border: none;
                cursor: pointer;
                width: 100%;
            }
        </style>
    </head>
    <body>
        <main>
            <h1>Shield</h1>
            
            <form id="form" action="/" method="GET">
                <input name="definition" placeholder="Definition" type="text" id="input" value="{{ .Definition }}" />
                <br />

                {{ range .FullParticipants }}
                  <div>
                    <input type="checkbox" id="{{ . }}" name="{{ . }}" {{ if . | IsApprover }}checked{{ end }} />
                    <label for="{{ . }}">{{ . }}</label>
                  </div>
                {{ end }}

                <br />
                <button type="submit">Submit</button>
            </form>

            <div class="result">
                <h2>Result</h2>
                <p>Definition</p>
                <pre>{{ .Definition }}</pre>
                <p>Participants</p>
                <ul>
                    {{ range .FullParticipants }}
                        <li>
                            {{ if . | IsApprover}}✅{{ else }}❌{{ end }}
                            {{ . }}
                        </li>
                    {{ end }}
                </ul>
                <p>Result</p>
                <pre>{{ .Result }}</pre>
            </div>
        </main>
    </body>
</html>
`))
		tmpl.Execute(w, struct {
			Definition       string
			FullParticipants []string
			Result           string
		}{
			Definition:       definition,
			FullParticipants: fullParticipants,
			Result:           evaluated.Inspect(),
		})
	})

	log.Println("Listening on :9999")
	http.ListenAndServe(":9999", nil)
}

type mockEnvironment struct {
	store map[string]struct{}
}

func (e *mockEnvironment) Get(name string) (object.Object, bool) {
	switch name {
	case "any", "all":
		return nil, false
	}

	e.store[name] = struct{}{}
	return object.FALSE, true
}
