<?php
namespace file;

use Exception;

class FileService
{

    /**
     * @throws Exception
     */
    public function save(string $input, string $place): string
    {
        if (!file_exists("./upload")){
           mkdir("./upload");
        }
        if (!file_exists("./upload/$place")){
            touch("./upload/$place");
        }
        file_put_contents("./upload/$place", $input);
        return $place;
    }

    public function saveCaf(string $file, int $user_id, string $extent): string
    {
        if (!file_exists("./upload")){
            mkdir("./upload");
        }
        if (!file_exists("./upload/caf")){
            mkdir("./upload/caf");
        }
        $file_name = "caf/user_$user_id.$extent";

        if (!file_exists('./upload/'.$file_name)){
            touch('./upload/'.$file_name);
        }
        file_put_contents('./upload/'.$file_name, $file);

        return $file_name;
    }

    public function get(string $file): string{
        return file_get_contents('./upload/'.$file);
    }
}