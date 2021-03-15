.PHONY: cut-tag
cut-tag:
	@echo "Cutting $(version)"
	git tag $(version)
	git push origin $(version)

.PHONY: release
release: build-for-container
	@echo "Releasing $(GIT_VERSION)"
	docker build -t blog . --build-arg VERSION=$(GIT_VERSION)
	docker tag blog:latest omegion/blog:$(GIT_VERSION)
	docker push omegion/blog:$(GIT_VERSION)
