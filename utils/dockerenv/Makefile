.IGNORE: clean init config redeploy clean-hyperlane clean-all

CHAIN_ID := devnet_12345-1
VALIDATORS ?= 3
TOKEN ?= award
RED := \033[0;31m
GREEN := \033[0;32m
YELLOW := \033[0;33m
BLUE := \033[0;34m
NC := \033[0m # No Color

# Check OS and apply appropriate sed command
ifeq ($(shell uname), Darwin)
    # macOS
		SED := sed -i ''
else
    # Linux and other OS
		SED := sed -i
endif

.PHONY: clean-all
clean-all: clean clean-hyperlane

.PHONY: clean
clean:
	@echo -e "$(GREEN)Cleaning up... $(NC)"
	@docker-compose down > /dev/null 2>&1;
	@docker-compose rm > /dev/null 2>&1
	@rm -f docker-compose.yaml > /dev/null 2>&1
	@for i in $(shell seq 0 $$(expr $(VALIDATORS) - 1)); do \
		echo -e "${GREEN} Cleaning validator $$i ${NC}"; \
		docker kill val-$$i > /dev/null 2>&1; \
		docker rm val-$$i > /dev/null 2>&1; \
		docker volume rm val-$$i > /dev/null 2>&1; \
  done
	@rm -fR /tmp/gentx > /dev/null 2>&1

.PHONY: clean-hyperlane
clean-hyperlane:
	@echo -e "$(GREEN)Cleaning up Hyperlane... $(NC)"
	@rm -fR chains configs hyperlane_db > /dev/null 2>&1
	@docker kill anvilnode1 hyperlane-relayer hyperlane-router > /dev/null 2>&1
	@docker rm anvilnode1 hyperlane-relayer hyperlane-router > /dev/null 2>&1

.PHONY: init
init: clean
	@echo -e "$(GREEN)Initializing network $(NC)"
	scripts/init.sh $(CHAIN_ID) $(VALIDATORS) $(TOKEN)

.PHONY: deploy
deploy: 
	@echo -e "$(GREEN)Deploying network $(NC)"
	docker-compose up -d

.PHONY: hyperlane
hyperlane: 
	@echo -e "$(GREEN)Deploying hyperlane $(NC)"
	bash scripts/hyperlane.sh

.PHONY: contract
contract: 
	@echo -e "$(GREEN)Deploying Callback contract $(NC)"
	bash scripts/deployContract.sh

.PHONY: stop
stop:
	@echo -e "$(GREEN)Stopping network $(CHAIN_ID) $(NC)"
	docker-compose stop

.PHONY: all
all: init deploy hyperlane

