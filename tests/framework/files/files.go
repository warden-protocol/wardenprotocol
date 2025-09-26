package files

import (
	"html/template"
	"io"
	"os"
	"strings"
)

// CloneDir clones a directory from src to dest, rendering all .tmpl files with the given template data.
func CloneDir(dest, src string, templateData any) error {
	err := os.MkdirAll(dest, os.ModePerm)
	if err != nil {
		return err
	}

	entries, err := os.ReadDir(src)
	if err != nil {
		return err
	}

	for _, entry := range entries {
		if entry.IsDir() {
			if err := CloneDir(dest+"/"+entry.Name(), src+"/"+entry.Name(), templateData); err != nil {
				return err
			}
		} else {
			if strings.HasSuffix(entry.Name(), ".tmpl") {
				// render template
				out, err := os.Create(dest + "/" + entry.Name()[0:len(entry.Name())-len(".tmpl")])
				if err != nil {
					return err
				}

				t, err := template.New(entry.Name()).ParseFiles(src + "/" + entry.Name())
				if err != nil {
					return err
				}

				if err := t.Execute(out, templateData); err != nil {
					return err
				}
			} else {
				// copy file
				out, err := os.Create(dest + "/" + entry.Name())
				if err != nil {
					return err
				}

				in, err := os.Open(src + "/" + entry.Name())
				if err != nil {
					return err
				}

				_, err = io.Copy(out, in)
				if err != nil {
					return err
				}
			}
		}
	}

	return nil
}
