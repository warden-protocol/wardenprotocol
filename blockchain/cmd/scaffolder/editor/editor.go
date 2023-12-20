// Copyright 2023 Qredo Ltd.
// This file is part of the Fusion library.
//
// The Fusion library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Fusion library. If not, see https://github.com/qredo/fusionchain/blob/main/LICENSE
package editor

import (
	"bytes"
	"fmt"
	"go/format"
	"log"
	"os"
	"regexp"
	"strings"
	"text/template"

	"github.com/qredo/fusionchain/cmd/scaffolder/casing"
)

type Modifier interface {
	Modify(content []byte) []byte
}

type Replacer struct {
	// Matcher is the string the follows the # in placeholder lines.
	// E.g. in the following line, Matcher is 1:
	//   // this line is used by starport scaffolding # 1
	//
	// If you leave Matcher empty, it will be set to "1".
	Matcher string

	Substitute string
}

func (r Replacer) Modify(content []byte) []byte {
	matcher := r.Matcher
	if len(matcher) == 0 {
		matcher = "1"
	}

	re := regexp.MustCompile(
		fmt.Sprintf(`((.*)// this line is used by [\w ]* # %s)`, matcher),
	)

	if re.FindIndex(content) == nil {
		panic(fmt.Sprintf("not found: %s", re.String()))
	}

	substitute := r.Substitute
	lines := strings.Split(substitute, "\n")
	// indent lines
	for i, l := range lines {
		if len(l) == 0 {
			continue
		}
		lines[i] = "${2}" + l
	}
	substitute = strings.Join(lines, "\n")

	// put back the placeholder at the end
	substitute = substitute + "\n$1"

	res := re.ReplaceAll(content, []byte(substitute))
	return res
}

type Appender struct {
	What string
}

func (a Appender) Modify(content []byte) []byte {
	return append(content, []byte(a.What)...)
}

func Pipe(content []byte, modifiers ...Modifier) []byte {
	res := content
	for _, m := range modifiers {
		res = m.Modify(res)
	}
	return res
}

func Pipeline(
	path string,
	modifiers []Modifier,
) error {
	content, err := os.ReadFile(path)
	if err != nil {
		return err
	}

	res := Pipe(content, modifiers...)

	err = os.WriteFile(path, res, 0600)
	if err != nil {
		return err
	}

	log.Printf("modified: %s", path)
	return nil
}

func NewFile(path string, tmpl string, params any) error {
	t, err := template.New("").Funcs(template.FuncMap{
		"ToUpper":     casing.ToUpper,
		"ToLower":     casing.ToLower,
		"ToKebabCase": casing.ToKebabCase,
		"ToSnakeCase": casing.ToSnakeCase,
	}).Parse(tmpl)
	if err != nil {
		return err
	}

	var out []byte
	w := bytes.NewBuffer(out)
	err = t.Execute(w, params)
	if err != nil {
		return err
	}

	// format the code (same as go fmt)
	formatted, err := format.Source(w.Bytes())
	if err != nil {
		return err
	}

	err = os.WriteFile(path, formatted, 0600)
	if err != nil {
		return err
	}

	log.Printf("new: %s", path)
	return nil
}
