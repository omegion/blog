.PHONY: cut-tag
cut-tag:
	@echo "Cutting $(version)"
	git tag $(version)
	git push origin $(version)

.PHONY: release
release: build-for-container
	@echo "Releasing $(version)"
	docker build -t blog .
	docker tag blog:latest omegion/blog:$(version)
	docker push omegion/blog:$(version)
