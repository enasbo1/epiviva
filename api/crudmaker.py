import os


def to_array_string(col: list) -> str:
    ret = ""
    for i, j in enumerate(col):
        t = '$params->' + j[0]
        if (len(j) > 2):
            default = j[2]
        else:
            default = 'null'
        ret += '\t\t\t"' + j[0] + f'" => isset({t})?{t}:{default}'
        if (i + 1) < len(col):
            ret += ',\n'
    return ret


def to_verif_string(col: list) -> str:
    ret = "";
    for i, j in enumerate(col):
        ret += '\t\t\t"' + j[0] + '" => "' + j[1] + '"'
        if (i + 1) < len(col):
            ret += ',\n'
    return ret;


def main():
    location: str = 'src'
    target: str = 'crud'
    name: str = input("model_name:\n >> ")
    table: str = input("table_name:\n >> ")
    data_files = os.listdir("crudmaker_bin/crmd");
    valide = False
    if table.lower() + ".crmd" in data_files:
        valide = (input(
            f'table-model file "{table}.crmd" detected, do you want to use it ? (y/n, default "y"): ') or "y") == "y"
    if valide:
        with open(f'crudmaker_bin/crmd/{table}.crmd', 'r', encoding='UTF-8') as text:
            _file = text.read()
            col = [i.split("-|-") for i in _file.split("\n")]
    else:
        col: list = []
        print("colomns (empty to end):")
        cont = True
        while cont:
            n: str = input("name >> ")
            if n == "":
                cont = False
            else:
                r: str = input("res  >> ")
                col.append([n, r])

    dico: dict = {
        "name": name.lower(),
        "NAME": name.upper(),
        "Name": name.capitalize(),
        "table": table.lower(),
        "TABLE": table.upper(),
        "Table": table.capitalize(),
        "list_colomn_array": to_array_string(col),
        "list_colomn_verif": to_verif_string(col),
    }
    templates = os.listdir("crudmaker_bin/templates")

    if not os.path.isdir(f'{target}'):
        os.makedirs(target)

    if not os.path.isdir(f'{location}'):
        os.makedirs(location)

    if not os.path.isdir(f'{location}/{name}'):
        os.makedirs(f'{location}/{name}')

    if not os.path.isdir(f'{target}/{name}'):
        os.makedirs(f'{target}/{name}')

    created_file: list = []
    for i in templates:
        print(i)
        with open(f'crudmaker_bin/templates/{i}', 'r', encoding='UTF-8') as text:
            tplt = text.read()
        filename = dico["Name"] + ".".join(i.split(".")[:-1])
        _file_content = [i.split("}|}") for i in tplt.split("{|{")]
        for f in _file_content:
            if len(f) == 2:
                f[0] = dico[f[0]]
            elif len(f) == 1:
                pass
            else:
                print('error, syntax {|{ or }|} used separately')

        tplt = "".join("".join(i) for i in _file_content)
        n: bool = i.split(".")[-1] == 'tfphp'
        b: bool = i.split(".")[-1] == 'tbphp'
        v = (not os.path.isfile(f'{location}/{name}/{filename}.php'))
        if v | n | b:
            if b:
                g = False
                with open(f'{target}/{name}/{filename}.php', 'w', encoding='UTF-8') as file:
                    file.write(tplt)
                created_file.append(f'{target}/{name}/{filename}.php')

            elif (not b) & (not v) & n:
                g = (input(
                    f'file {location}/{name}/{filename}.php already exist, do you want to overwrite it ? (y/n, default "y"): ') or "y") == "y"
            else:
                g = True

            if g:
                with open(f'{location}/{name}/{filename}.php', 'w', encoding='UTF-8') as file:
                    file.write(tplt)
                created_file.append(f'{location}/{name}/{filename}.php')
        else:
            print(f'already existing file : {location}/{name}/{filename}.php')

    print(f'\n\n|= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =|')
    print(f' the CRUD of Model "{name}" for table "{table}" was well generated:\n')
    for i in created_file:
        print(f'\tCREATED : file : {i}')
    print(f'\nplease add the {name} model to the route manualy');


main()
