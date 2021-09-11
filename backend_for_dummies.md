# Навигация
[:dart:](https://github.com/nvm-sh/nvm/blob/master/README.md) **[NVM](#nvm)**  
[:dart:](https://docs.docker.com/) **[Docker](#docker)**  
[:dart:](https://getcomposer.org/) **[Composer](#composer)**  
[:dart:](https://devilbox.readthedocs.io/en/latest/index.html) **[DevilBox](#devilbox)**  
[:dart:](https://devilbox.readthedocs.io/en/latest/examples/setup-wordpress.html) **[WordPress](#wordpress)**

# NVM
> Необходимо предустановить `curl`.

## Установка
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

Найти профайл `~/.profile` и вставить скрипт.
```
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

> Также профайлом могут быть `~/.bashrc`, `~/.bash_profile` или `~/.zshrc`.

Проверить успешность установки и перезагрузиться.
```bash
command -v nvm
```

## Основные комманды

Посмотреть установленные версии.
```bash
nvm ls
```

> Чтобы просмотреть все доступные версии можно ввести `nvm ls-remote`.

Установить последнюю `LTS` версию.
```bash
nvm install --lts
```

Установить конкретную версию (`[version]` - версия **node**).
```bash
nvm install [version]
```

Использовать конкретную версию (`[version]` - версия **node**).
```bash
nvm use [version]
```

Использовать конкретную версию по умолчанию (`[version]` - версия **node**).
```bash
nvm alias default [version]
```

# Docker
> Необходимо предустановить `git`.

## Установка
```bash
sudo snap install docker
```
```bash
sudo snap start docker
```

## Запуск локального сервера.
```bash
sudo docker-compose up
```

> При первом запуске необходимо дождаться загрузки всех ресурсов.

## Переустановка
```bash
sudo snap remove docker
```
```bash
sudo snap install docker
```

## Запуск без sudo
```bash
sudo groupadd docker
```
```bash
sudo gpasswd -a $USER docker
```

Перезагрузиться, чтобы изменения вступили в силу.

>Первая команда, скорее всего, не удастся, поскольку группа, возможно, уже существует, но запустить ее лучше в любом случае.

# Composer

## Установка
```bash
sudo apt install composer
```
```bash
composer
```

## Смена версии
Удалить текущий пакет
```bash
sudo apt-get remove --purge composer
```

Загрузить установщик
```bash
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
```

Установить нужную версию (`[version]` - версия composer).
```bash
php composer-setup.php --[version]
```

Появившийся файл `composer.phar` переместить в нужное место.
```bash
sudo mv composer.phar /usr/local/bin/composer
```

# DevilBox
>Необходимо предустановить `git`.

### Установка
```bash
git clone https://github.com/cytopia/devilbox
```

Создать `.env` файл.
```bash
cp env-example .env
```

>Точечную конфигурацию настроек можно выполнить в файле `.env` [:dart:](https://devilbox.readthedocs.io/en/latest/configuration-files/env-file.html).

Запустить локальный сервер.  
```bash
docker-compose up
```

>Для запуска в фоновом режиме можно использовать флаг `-d`.

Если включён **SELinux**, то надо изменить соответствующую настройку в `.env` файле, чтобы разрешить монтирование между нескольколькими контейнерами.  
```bash
MOUNT_OPTIONS=,z
```

# WordPress
>Необходимо предустановить `devilbox`.

## Установка
Войти в **shell** и создать папку (`[site-name]` - субдомен).  
```bash
sudo ./shell.sh
```
```bash
mkdir [site-name]
```

Внутрь поместить **wordpress** проект (`[project-name]` - название проекта).
```bash
cd [site-name]
```
```bash
mkdir [project-name]
```

>Можно скачать пустой **wordpress** проект с помощью `git`.
```bash
git clone https://github.com/WordPress/WordPress [project-name]
```

Создать Symlinking.
```sh
ln -s [project-name]/ htdocs
```

>Просмотреть вложенность и убедиться, что ссылка создана правильно - `tree -L 1`.

Создать базу данных (`[project-db]` - название БД).
```sh
mysql -u root -h 127.0.0.1 -p -e 'CREATE DATABASE [project-db];'
```

>Создать базу данных можно и в DevilBox во вкладке **Tools>phpMyAdmin** (см. [phpMyAdmin - Doc](https://docs.phpmyadmin.net/en/latest/)).  

Настроить DNS. Добавить созданный домен после localhost.  
```bash
sudo nano /etc/hosts
```
```bash
docker-compose restart
```
