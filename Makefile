SHELL=bash
UUID=spotify-artwork-fixer@wjt.me.uk

.PHONY: build check compress install uninstall clean

build:
	gnome-extensions pack --force --extra-source=LICENSE.txt
check:
	if [[ ! -f "$(UUID).shell-extension.zip" ]]; then \
	  echo -e "WARNING! Extension zip couldn't be found"; exit 1; \
	fi
	if [[ "$$(stat -c %s $(UUID).shell-extension.zip)" -gt 4096000 ]]; then \
	  echo -e "\nWARNING! The extension is too big to be uploaded to the extensions website, keep it smaller than 4096 KB"; exit 1; \
	fi
compress:
	optipng -o7 -strip all docs/*.png
install:
	gnome-extensions install "$(UUID).shell-extension.zip" --force
uninstall:
	gnome-extensions uninstall "$(UUID)"
clean:
	rm -rf "$(UUID).shell-extension.zip"
