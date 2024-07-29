# Примеры сборки пакетов с исходными текстами на Python, Bash, С++

Для примера сборки пакетов будем использовать простые программы на языках C++, Python, Bash. Программы выводят строку "Hello World!" в терминал.

**📌 NOTE**\
**Каждый проект можно скачать из [GitHub репозитория](https://github.com/SokolovValy/Alt_Example_Code).**

## Исходные тексты:

### C++

cello.cpp

```CPP
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}

```

### Bash

bello

```bash
#!/bin/bash

printf "Hello World\n"
```

### Python

pello.py

```python
#!/usr/bin/env python

print("Hello World")
```

### LICENSE

```txt

	This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

```

## Подготовка пространства 

Первым шагом - создадим дерево каталогов. Вручную, или же с помощью команды "$ rpmdev-setuptree".

```bash
$ mkdir RPM
$ cd RPM
$ mkdir BUILD  RPMS  SOURCES  SPECS  SRPMS
```

Или

```bash
$ rpmdev-setuptree
```

**📌 NOTE**\
ВНИМАНИЕ! если Вы воспользовались утилитой rpmdev-setuptree, а не создали дерево каталогов вручную, обрате внимание на файл [~/home/.rpmmacros](#rpmmacros-warning)

Далее необходимо подготовить каталоги для каждого из трёх проектов:

```bash
$ mkdir bello cello pello
```

Каждый каталог должен содержать в себе исходный код соответствующей программы, лицензию, .spec-файл. 

**📌 NOTE**\
Следующие действия идентичны для всех трёх каталогов:

**Подготовка каталога на примере проекта bello:**

Инициализируем Git-репозиторий командой:

```bash
$ git init
```

Создадим два файла: bello и bello.spec, LICENSE. В файл bello запишем код скрипта, а в файл LICENSE - лицензию. (см. выше)

**📌 NOTE**\
Так как файлы bello и pello являются скриптами, они должны быть исполняемыми. Добавить бит исполняемости можно следующей командой:

```bash
chmod +x bello
```

Создадим подкаталог .gear и перейдём в него.

```bash
$ mkdir .gear
$ cd .gear
```

В каталоге .gear создадим файл rules.

```bash
$ touch rules
```

После всех действий каталог примет следующий вид:

```bash
$ cd bello

$ ls -la
итого 28
drwxr-xr-x 4 sova domain users 4096 дек 12 04:31 .
drwxr-xr-x 5 sova domain users 4096 дек 12 03:15 ..
-rwxrwxr-x 1 sova domain users   35 дек 12 04:31 bello
-rw-r--r-- 1 sova domain users  611 дек 12 04:31 bello.spec
drwxr-xr-x 2 sova domain users 4096 дек 12 03:50 .gear
drwxr-xr-x 8 sova domain users 4096 дек 12 04:31 .git
-rw-rw-r-- 1 sova domain users  652 дек 12 04:31 LICENSE
```

## Написание spec файла и правил Gear

Следующим этапом сборки будет написание spec файла и правил для gear.

В каталоге .gear откроем файл rules.(Аналогично для всех трёх проектов) Заполним его следующим содержимым:

```yml
tar: .
```

Строка указывает, что проект будет упакован в .tar архив.  На этом этапе редактирование rules заканчивается.

Создание .spec файла для bello.

В заголовке или шапке спек файла находятся секции Name, Version, Release, Summary, License, Group, BuildArch, BuildRequires, Source0.

Заполнив данные секции, заголовок spec-файла bello примет вид:

```yml
Name: bello
Version: 0.1
Release: alt1
Summary: Hello World example implemented in bash script
Group: Other

License: GPLv3+
URL: https://github.com/altlinux/alt-packaging-guide/tree/master/example-code

Source0: %{name}-%{version}.tar

Requires: bash
BuildArch: noarch
```

Стандартная схема Name-Version-Release, содержащая в себе имя пакета, его версию и релиз сборки. Поле Summary включает в себя краткое описание пакета. License - лицензия, под которой выпускается данное ПО. В данном случае - GPLv3. Группа - категория, к которой относится пакет. Так как это тестовый пакет для примера, выставим группу "Other". BuildRequires - пакеты, необходимые для сборки. Так как исходный код написан на bash, нам необходим пакет bash. Source0 - путь к архиву с исходниками (%name-%version.tar). На этом заголовок .spec файла заканчивается.

Далее - тело, или основная часть .spec файла. В ней описывается сам процесс сборки и инструкции к преобразованию исходных файлов.

Начнём с заполнения полей %description и %prep

```yml
%description
The long-tail description for our Hello World Example implemented in
bash script.

%prep
%setup -q
```

В секции %description находится краткое описание программы. Секция %prep отвечает за подготовку программы к сборке. Макрос %setup распаковывает исходный код.

В секции %install описаны инструкции, как установить файлы пакета в систему конечного пользователя.

Вместо того, чтобы писать пути установки файлов вручную, будем использовать предопределённые макросы: %buildroot%_bindir будет раскрываться в путь /usr/bin. По этому пути будет создан каталог с именем пакета, в который будет помещён файл bello с правами доступа 755.

Секция %files

```yml
%files
%doc LICENSE
%_bindir/%name
```

В секции %files описано, какие файлы и каталоги с соответствующими атрибутами должны быть скопированы из дерева сборки в rpm-пакет, а затем будут копироваться в целевую систему при установке этого пакета.

Секция %changelog. Здесь описаны изменения внесённые в ПО, патчи, изменения методологии сборки

```yml
%changelog
* Mon  date name <email@adress.com> 0.1-alt1
- First bello package
```

После всех преобразований .spec файл будет выглядеть следующим образом:

```yml
Name: bello
Version: 0.1
Release: alt1
Summary: Hello World example implemented in bash script
Group: Other

License: GPLv3+
URL: https://github.com/altlinux/alt-packaging-guide/tree/master/example-code

Source0: %{name}-%{version}.tar

Requires: bash
BuildArch: noarch

%description
The long-tail description for our Hello World Example implemented in
bash script.

%prep
%setup -q

%install
mkdir -p %buildroot%_bindir

install -m 0755 %name %buildroot%_bindir/%name

%files
%doc LICENSE
%_bindir/%name

%changelog
* Mon  date name <email@adress.com> 0.1-alt1
- First bello package
```

Сохраним файл и перейдём в основную директорию нашего проекта.

Теперь необходимо добавить созданные нами файлы на отслеживание git. Сделать это можно последовательным выполнением команд:

```bash
$ git add bello bello.spec LICENSE .gear/rules

$ git commit -m "First commit"
```

После  запустим сборку с помощью инструмента gear следующей командой:

```bash
$ gear-rpm -ba
#
#
#
Wrote: /home/SMB.BASEALT.RU/sova/RPM/SRPMS/bello-0.1-alt1.src.rpm (w2.lzdio)
Wrote: /home/SMB.BASEALT.RU/sova/RPM/RPMS/noarch/bello-0.1-alt1.noarch.rpm (w2.lzdio)
```

Если сборка прошла успешно, собранный пакет bello-0.1-alt1.noarch.rpm будет находиться в /home/user/RPM/RPMS/noarch

Аналогично для сборки в связке gear и hasher:

```bash
$ gear-hsh --no-sisyphus-check --commit -v
#
#
#
Wrote: /usr/src/RPM/SRPMS/bello-0.1-alt1.src.rpm (w2.lzdio)
Wrote: /usr/src/RPM/RPMS/noarch/bello-0.1-alt1.noarch.rpm (w2.lzdio)
```

Если сборка прошла успешно, собранный пакет bello-0.1-alt1.noarch.rpm будет находиться в /home/user/hasher/repo/x86_64/RPMS.hasher

## Формирование .spec-файла для pello.

В заголовке или шапке спек файла находятся секции Name, Version, Release, Summary, License, Group, BuildArch, BuildRequires, Source0.

Заполнив данные секции, заголовок spec-файла pello примет вид:

```yml
Name: pello
Version: 0.1.1
Release: alt1
Summary: Hello World example implemented in bash python
Group: Other

License: GPLv3+
URL: https://github.com/altlinux/alt-packaging-guide/tree/master/example-code

Source0: %{name}-%{version}.tar

Requires: python3
BuildArch: noarch
```

Стандартная схема Name-Version-Release, содержащая в себе имя пакета, его версию и релиз сборки. Поле Summary включает в себя краткое описание пакета. License - лицензия, под которой выпускается данное ПО. В данном случае - GPLv3. Группа - категория, к которой относится пакет. Так как это тестовый пакет для примера, выставим группу "Other". BuildRequires - пакеты, необходимые для сборки. Так как исходный код написан на python3, нам необходим пакет rpm-build-python3 с макросами для сборки скриптов Python. Source0 - путь к архиву с исходниками (%name-%version.tar). На этом заголовок .spec файла заканчивается.

Далее - тело, или основная часть .spec файла. В ней описывается сам процесс сборки и инструкции к преобразованию исходных файлов.

**Начнём с заполнения полей %description и %prep**.

```yml
%prep
%setup -q

# fix python shebang for scripts
grep -R '^#!/usr/bin/\(env[[:space:]]\+\)\?python' . | cut -d: -f1 |
    while read f; do
        sed -E -i '1 s@^(#![[:space:]]*)%_bindir/(env[[:space:]]+)?python$@\1%__python3@' "$f"
    done
```

В секции %description находится краткое описание программы. Секция %prep отвечает за подготовку программы к сборке. Макрос %setup распаковывает исходный код. 
Часть кода после под строкой "# fix python shebang for scripts" это набор команд для обновления shebang (первой строки в исполняемом файле, которая указывает на интерпретатор, с помощью которого следует выполнять скрипт) в Python-скриптах в вашем проекте. В частности, он предназначен для изменения старого shebang :#!/usr/bin/python на более современный и более гибкий вариант с использованием env: #!/usr/bin/env python.

Поэтапное описание: 

1. **grep -R '^#!/usr/bin/\(env[[:space:]]\+\)\?python' .**: Эта команда ищет строки, начинающиеся с `shebang`, где указан путь к интерпретатору Python. Регулярное выражение проверяет shebang с использованием env для гибкой настройки пути к интерпретатору Python.
2. **cut -d: -f1**: Команда cut используется для обрезания вывода, чтобы получить только имена файлов, содержащих старый shebang.
3. **while read f; do ... done**: Это цикл, который читает каждое имя файла (полученное из предыдущей команды) и выполняет команды внутри блока do.
4. sed -E -i '1 s@^(#![[:space:]]*)%_bindir/(env[[:space:]]+)?python$@\1%__python3@' "$f": Эта команда использует sed для изменения первой строки файла (где находится shebang). Регулярное выражение заменяет старый shebang на новый с использованием %__python3.

**Секция %install**

```spec
%install
mkdir -p %buildroot%_bindir
mkdir -p %buildroot%_libexecdir/%name
```

Здесь создаются две директории в %buildroot (которая представляет собой временный корень файловой системы для сборки пакета): %_bindir и %_libexecdir/%name.

```spec
cat > %buildroot%_bindir/%name <<-EOF
#!/bin/bash
/usr/bin/python3 %_libexecdir%name/__pycache__/%name.cpython-$(echo %__python3_version | sed 's/\.//').pyc
EOF
chmod 0755 %buildroot%_bindir/%name

install -m 0644 %name.py %buildroot%_libexecdir/%name/
```

Секция %files

```spec
%files
%doc LICENSE
%dir %_libexecdir/%name/
%_bindir/%name
%_libexecdir/%name/%name.py
%_libexecdir/%name/__pycache__/*.py*
```

В секции %files описано, какие файлы и каталоги с соответствующими атрибутами должны быть скопированы из дерева сборки в rpm-пакет, а затем будут копироваться в целевую систему при установке этого пакета. 

```spec
%changelog
* Date name <email@address.com> 0.1.1-alt1
- First pello package
```

После всех изменений spec-файл примет следующий вид. 

```yml
Name: pello
Version: 0.1.1
Release: alt1
Summary: Hello World example implemented in python
Group: Other

License: GPLv3+
URL: https://www.example.com/%{name}

Source0: https://www.example.com/%{name}/releases/%{name}-%{version}.tar

BuildRequires: python3
BuildArch: noarch

%add_python3_lib_path %_libexecdir/%name

%description
The long-tail description for our Hello World Example implemented in Python.

%prep
%setup -q

# fix python shebang for scripts
grep -R '^#!/usr/bin/\(env[[:space:]]\+\)\?python' . | cut -d: -f1 |
    while read f; do
        sed -E -i '1 s@^(#![[:space:]]*)%_bindir/(env[[:space:]]+)?python$@\1%__python3@' "$f"
    done

%install
mkdir -p %buildroot%_bindir
mkdir -p %buildroot%_libexecdir/%name

cat > %buildroot%_bindir/%name <<-EOF
#!/bin/bash
/usr/bin/python3 %_libexecdir%name/__pycache__/%name.cpython-$(echo %__python3_version | sed 's/\.//').pyc
EOF

chmod 0755 %buildroot%_bindir/%name

install -m 0644 %name.py %buildroot%_libexecdir/%name/

%files
%doc LICENSE
%dir %_libexecdir/%name/
%_bindir/%name
%_libexecdir/%name/%name.py
%_libexecdir/%name/__pycache__/*.py*

%changelog
* Date Name <email@address.com> 0.1.1-alt1
- First pello package

```

Сохраним файл и перейдём в основную директорию нашего проекта.

Теперь необходимо добавить созданные нами файлы на отслеживание git. Сделать это можно с помощью команды:

```bash
$ git add pello pello.spec LICENSE .gear/rules

$ git commit -m "First commit"
```

После добавление файлов на отслеживание, запустим сборку с помощью инструмента gear следующей командой:

```bash
$ gear-rpm -ba
#
#
#
Wrote: /home/SMB.BASEALT.RU/sova/RPM/SRPMS/pello-0.1.1-alt1.src.rpm (w2.lzdio)
Wrote: /home/SMB.BASEALT.RU/sova/RPM/RPMS/noarch/pello-0.1.1-alt1.noarch.rpm (w2.lzdio)
```

Если сборка прошла успешно, собранный пакет pello-0.1.1-alt1.noarch.rpm будет находиться в /home/user/RPM/RPMS/noarch

Аналогично для сборки в связке gear и hasher:

```bash
$ gear-hsh --no-sisyphus-check --commit -v
#
#
#
Wrote: /usr/src/RPM/SRPMS/pello-0.1.1-alt1.src.rpm (w2.lzdio)
Wrote: /usr/src/RPM/RPMS/noarch/pello-0.1.1-alt1.noarch.rpm (w2.lzdio)
```

Если сборка прошла успешно, собранный пакет pello-0.1.1-alt1.noarch.rpm будет находиться в /home/user/hasher/repo/x86_64/RPMS.hasher

## Описание пакета с исходными текстами на C++

В каталоге cello создадим Makefile - набор инструкций для программы make, которая собирает(компилирует) данный проект, и заполним его следующим содержимым:

```bash
$ touch Makefile
```

Содержание Makefile:

```Makefile
cello:
<------>gcc -g -o cello cello.c

clean:
<------>rm cello

install:
<------>mkdir -p $(DESTDIR)/usr/bin
<------>install -m 0755 cello $(DESTDIR)/usr/bin/cello
```

Перейдём к написанию .spec-файла.

В заголовке или "шапке" .spec файла описаны следующие поля:

```yml
Name: pello
Version: 0.1.1
Release: alt1
Summary: Hello World example implemented in C++
Group: Other

License: GPLv3+
URL: https://github.com/altlinux/alt-packaging-guide/tree/master/example-code

Source0: %{name}-%{version}.tar

BuildRequires: gcc-g++
BuildRequires: make
```

Стандартная схема Name-Version-Release, содержащая в себе имя пакета, его версию и релиз сборки. Поле Summary включает в себя краткое описание пакета. License - лицензия, под которой выпускается данное ПО. В данном случае - GPLv3. Группа - категория, к которой относится пакет. Так как это тестовый пакет для примера, выставим группу "Other". BuildRequares - пакеты, необходимые для сборки. Так как исходный код написан на c++, нам необходим компилятор g + +, система сборки программы - make.

**Тело .spec файла:**

```SPECFILE
%description
The long-tail description for our Hello World Example implemented in C++.

%prep
%setup -q

%build
%make

%install
%makeinstall_std

%files
%doc LICENSE
%_bindir/%name
```

**Секция %description** - описание 

**Секция %prep**
 Макрос %setup с флагом -q распаковывает архив, описанный в секции Source0.
 В секции %build происходит сборка исходного кода. Так как в примере присутствует Makefile для автоматизации процесса сборки, то в секции будет указан макрос %make, использующий Makefile для сборки программы.

```SPEC
%changelog
* Date Name <mail@address.org> 1.0-alt1
- First cello package
```

После всех преобразований .spec-файл примет следующий вид.

```SPEC
Version: 1.0
Release: alt1
Summary: Hello World example implemented in C
Group: Other

License: GPLv3+
URL: https://www.example.com/%{name}

Source0: https://www.example.com/%{name}/releases/%{name}-%{version}.tar

BuildRequires: gcc-g++
BuildRequires: make

%description
The long-tail description for our Hello World Example implemented in C.

%prep
%setup -q

%build
%make

%install
%makeinstall_std

%files
%doc LICENSE
%_bindir/%name

%changelog
* Date Name <mail@address.org> 1.0-alt1
- First cello package
```

Сохраним файл и перейдём в основную директорию нашего проекта.

Теперь необходимо добавить созданные нами файлы на отслеживание git:

```bash
$ git add сello.cpp Makefile cello.spec LICENSE .gear/rules

$ git commit -m "First commit"
```

После добавление файлов на отслеживание, запустим сборку с помощью инструмента gear:

```bash
$ gear-rpm -ba
#
#
#
Wrote: /home/SMB.BASEALT.RU/sova/RPM/SRPMS/cello-1.0-alt1.src.rpm (w2.lzdio)
Wrote: /home/SMB.BASEALT.RU/sova/RPM/RPMS/noarch/cello-1.0-alt1.x86_64.rpm (w2.lzdio)
```

Если сборка прошла успешно, собранный пакет cello-1.0-alt1.x86_64.rpm будет находиться в /home/user/RPM/RPMS/noarch

Аналогично для сборки в связке gear и hasher с помощью команды:

```bash
$ gear-hsh --no-sisyphus-check --commit -v
#
#
#
Wrote: /usr/src/RPM/SRPMS/cello-1.0-alt1.src.rpm (w2.lzdio)
Wrote: /usr/src/RPM/RPMS/noarch/cello-1.0-alt1.x86_64.rpm (w2.lzdio)
```

Если сборка прошла успешно, собранный пакет cello-1.0-alt1.x86_64.rpm будет находиться в /home/user/hasher/repo/x86_64/RPMS.hasher.
