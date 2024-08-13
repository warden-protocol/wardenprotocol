// wasmvm-linter is a checker that ensures that all references to
// https://github.com/CosmWasm/wasmvm points to the same version.
package main

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"strings"
)

func main() {
	expectedVersion, err := getGoModVersion()
	if err != nil {
		panic(err)
	}

	matches, err := findFiles([]string{
		".goreleaser*",
		"Dockerfile",
	})
	if err != nil {
		panic(err)
	}

	fmt.Fprintln(os.Stderr, "go.mod version:", expectedVersion)

	var errors []string
	for _, match := range matches {
		v, err := findVersions(match)
		if err != nil {
			panic(err)
		}

		fmt.Printf("%s versions: %s\n", match, strings.Join(v, ", "))

		for _, version := range v {
			if version != expectedVersion {
				errors = append(errors, fmt.Sprintf("%s: expected %s, got %s", match, expectedVersion, version))
			}
		}
	}

	if len(errors) > 0 {
		fmt.Fprintln(os.Stderr, "ERROR: versions do not match")
		for _, err := range errors {
			fmt.Fprintln(os.Stderr, err)
		}
		os.Exit(1)
	} else {
		fmt.Fprintln(os.Stderr, "OK")
	}
}

func getGoModVersion() (string, error) {
	f, err := os.Open("go.mod")
	if err != nil {
		return "", err
	}
	defer f.Close()

	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		if strings.HasPrefix(scanner.Text(), "\tgithub.com/CosmWasm/wasmvm") {
			return parseGoModVersion(scanner.Text())
		}
	}

	return "", fmt.Errorf("wasmvm not found in go.mod")
}

func parseGoModVersion(line string) (string, error) {
	parts := strings.Split(line, " ")
	if !strings.HasPrefix(parts[0], "\tgithub.com/CosmWasm/wasmvm") {
		return "", fmt.Errorf("invalid go.mod line: %s", line)
	}
	return parts[1], nil
}

func findFiles(globs []string) ([]string, error) {
	var matches []string
	for _, glob := range globs {
		m, err := filepath.Glob(glob)
		if err != nil {
			return nil, err
		}
		matches = append(matches, m...)
	}
	return matches, nil
}

func findVersions(path string) ([]string, error) {
	f, err := os.Open(path)
	if err != nil {
		panic(err)
	}
	defer f.Close()

	var versions []string
	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		if strings.Contains(scanner.Text(), "github.com/CosmWasm/wasmvm/releases") {
			v, err := parseURLVersion(scanner.Text())
			if err != nil {
				return nil, err
			}
			versions = append(versions, v)
		}
	}

	if len(versions) == 0 {
		return nil, fmt.Errorf("wasmvm not found in %s", path)
	}

	return versions, nil
}

var urlRE = regexp.MustCompile(`github.com/CosmWasm/wasmvm/releases/download/(v\d+\.\d+\.\d+)/.*`)

func parseURLVersion(line string) (string, error) {
	parts := urlRE.FindStringSubmatch(line)
	if len(parts) != 2 {
		return "", fmt.Errorf("invalid URL: %s", line)
	}
	return parts[1], nil
}
