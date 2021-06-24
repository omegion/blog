K8S_DEPLOYMENT_FILE  = kubernetes/application/deployment.yaml
IMAGE_NAME  = ghcr.io/omegion/blog

.PHONY: bump-version
bump-version:
	@echo "Commit $(version)"
	yq eval '.spec.template.spec.containers[0].image = "$(IMAGE_NAME):$(version)"' -i $(K8S_DEPLOYMENT_FILE)
	npm version $(version) --no-git-tag-version --allow-same-version
	git commit -m "Bump to $(version)" package.json $(K8S_DEPLOYMENT_FILE)
	git push

.PHONY: cut-tag
cut-tag:
	@echo "Cutting $(version)"
	git tag $(version)
	git push origin $(version)

.PHONY: release
release:
	@echo "Releasing $(version)"
	docker build -t blog .
	docker tag blog:latest omegion/blog:$(version)
	docker push omegion/blog:$(version)
