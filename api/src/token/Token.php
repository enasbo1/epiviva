<?php

namespace token;
use Exception;

class Token
{
    private static string  $SECRET = "myS31e45'é-35c!r;e?t134568SLtpng";

    private static function sign(string $base64UrlHeader, string $base64UrlPayload):string{
        // Create Signature Hash
        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, Token::$SECRET, true);

        // Encode Signature to Base64Url String
        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

        return $base64UrlSignature;

    }

    static function createToken(int $user_id, string $user_firstname, string $user_lastname,  int $user_role, string $user_enterprise):string{
        // Create token header as a JSON string
        $header = json_encode(
            [
                'typ' => 'JWT',
                'alg' => 'HS256'
            ]
        );
        // Create token payload as a JSON string
        $payload = json_encode(
            [
                'user_id' => $user_id,
                'user_firstname' => $user_firstname,
                'user_lastname' => $user_lastname,
                'user_role' => $user_role,
                'user_enterprise'=> $user_enterprise
            ]
        );

        // Encode Header to Base64Url String
        $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));

        // Encode Payload to Base64Url String
        $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));

        // Create JWT
        $jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . Token::sign($base64UrlHeader,$base64UrlPayload);

        return $jwt;        
    }

    static function decodeToken(string $token):array{
        $jwt  = explode(".",$token);
        if ($jwt && (count($jwt)==3)){
            $header = json_decode(base64_decode(str_replace(['_','-'], ['/','+'],$jwt[0])));
            $payload = json_decode(base64_decode(str_replace(['_','-'], ['/','+'],$jwt[1])));
            $base64UrlSignature = $jwt[2];
            if ($base64UrlSignature == Token::sign($jwt[0],$jwt[1])){
                return [
                    'header' => $header,
                    'payload' => $payload
                ];
            }else{
                throw new Exception(json_encode(['message'=>'invalid tocken'], 401));
            }
        }else{
            throw new Exception(json_encode(['message'=>'invalid tocken'], 401));
        }
    }
}