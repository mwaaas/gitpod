OUTPUT ?= dist

all: clean deps compile

build:
	@echo "Building for ${GOOS}-${GOARCH}"
	go build -tags embedVersion -o ${OUTPUT}/gitpod-installer-${GOOS}-${GOARCH}${EXT}
	sha256sum ${OUTPUT}/gitpod-installer-${GOOS}-${GOARCH} > ${OUTPUT}/gitpod-installer-${GOOS}-${GOARCH}.sha256
.PHONY: build

clean:
	@echo "Cleaning ${OUTPUT}"
	rm -Rf ${OUTPUT}
	mkdir -p ${OUTPUT}
.PHONY: clean

compile:
	@echo "Compiling for every supported OS and platform"

	GOOS=linux GOARCH=amd64 $(MAKE) build
	GOOS=linux GOARCH=386 $(MAKE) build
	GOOS=linux GOARCH=arm $(MAKE) build
	GOOS=linux GOARCH=arm64 $(MAKE) build
.PHONY: compile

deps:
	@echo "Installing Helm dependencies"
	@for f in $(shell ls -d third_party/charts/*/); do cd $${f} && helm dep up && cd -; done
.PHONY: deps
