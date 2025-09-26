%: help

help:
	@echo "This project uses 'just' (https://github.com/casey/just) instead of 'make'."
	@echo "Refer to the full installation instructions at https://just.systems/man/en/chapter_4.html to install 'just' in your system."
	@echo "  Mac OS:      brew install just"
	@echo "  Arch Linux:  pacman -S just"

.PHONY: build-all build install build-wardend install-wardend build-wardenkms help
