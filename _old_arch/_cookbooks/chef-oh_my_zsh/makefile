prepare:
	rm -fr cookbooks
	berks install
	berks update
	berks vendor cookbooks
	bundle install

test:
	kitchen test