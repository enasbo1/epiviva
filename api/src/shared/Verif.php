<?php
namespace shared;

class Verif{
    static function post_str_min($value, string $arg)
    {
        return strlen($value) >= (integer) $arg;
    }

    static function post_str_max($value, string $arg)
    {
        return strlen($value) <= (integer) $arg;
    }
    static function post_str_equa($value, string $arg)
    {
        return strlen($value) == (integer) $arg;
    }
    static function post_int_inf($value, string $arg)
    {
        return (integer) $value < (integer) $arg;
    }

    static function post_int_sup($value, string $arg)
    {
        return (integer) $value > (integer) $arg;
    }
    static function compare($value, string $co, string $arg)
    {
        switch ($co) {
            case ":m":
                return Verif::post_str_min($value, $arg);
            case ":M":
                return Verif::post_str_max($value, $arg);
            case ":>":
                return Verif::post_int_sup($value, $arg);
            case ":<":
                return Verif::post_int_inf($value, $arg);
            case ":e":
                return Verif::post_str_equa($value, $arg);
            case ":d":
                return True;
            default:
                return False;
        }
    }

    static function message(string $co, string $arg)
    {
        switch ($co) {
            case ":m":
                return ' doit faire au moins ' . $arg . ' caractères';
            case ":M":
                return ' doit faire au maximum ' . $arg . ' caractères';
            case ":<":
                return ' doit être plus petit que ' . $arg;
            case ":>":
                return ' doit être plus grand que ' . $arg;
            case ":e":
                return ' doit faire exatement ' . $arg . ' caractères';
            case ":d":
                return ' doit faire exatement ' . $arg . ' caractères';
            default:
                return '';
        }
    }
    static function dechiffre($value, string $type, string $name)
    {
        $validate = [
            '!url' => FILTER_VALIDATE_URL,
            '!int' => FILTER_VALIDATE_INT,
            '!email' => FILTER_VALIDATE_EMAIL,
            '!float' => FILTER_VALIDATE_FLOAT
        ];
        $message = [
            '!url' => ' doit être une url valide',
            '!int' => ' doit être un nombre entier',
            '!email' => ' doit être une adresse mail valide',
            '!float' => ' doit être un nombre'
        ];
        $type = explode(' ', $type);
        foreach ($type as $co) {
            if (strlen($co)>0){
                if ($co[0] == '!') {
                    if (!filter_var($value, $validate[$co])) {
                        $msg = '"' . $name . '"' . $message[$co];
                        return(["message"=>$msg, "id"=>$name]);
                    }
                }
                if ($co[0] == ':') {
                    $i = explode(',', $co);
                    if (!Verif::compare($value, $i[0], $i[1])) {
                        $msg = '"' . $name . '"' . Verif::message($i[0], $i[1]);
                        return(["message"=>$msg, "id"=>$name]);
                    }
                }
            }
        }
        return ("validated");
    }

    static function verification(array $values, array $form)
    {
        foreach ($form as $key => $type) {
            if (!isset($values[$key]) || empty($values[$key])) {
                if ($type[0] == "r") {
                    $msg = 'le champ "' . $key . '" doit être remplit';
                    return(["message"=>$msg, "id"=>$key]);
                } else {
                    $type = "";
                    $values[$key] = "";
                }
            }
            $passed = Verif::dechiffre($values[$key], $type, $key);
            if ($passed !="validated"){
                return $passed ;
            }
        }
        return "validated";
    }
}
