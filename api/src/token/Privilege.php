<?php
namespace token;

use Exception;

class Privilege{
    /**
     * @throws Exception
     */
    public static function admin(): void
    {
        global $_TOKEN;
        if ($_TOKEN->user_role!==4){
            throw new Exception('{message:"only admin allowed"}', 403);
        }
    }
    /**
     * @throws Exception
     */
    public static function prestate(int $entreprise = null): void
    {
        global $_TOKEN;
        if ($_TOKEN->user_role<3){
            throw new Exception('{"message":"not allowed",id:"'.$_TOKEN->user_enterprise.'}', 403);
        }
        if ($_TOKEN->user_role==3){
            if (($entreprise!==null) and ($entreprise !== $_TOKEN->user_enterprise)){
                throw new Exception('{"message":"not allowed"}', 403);
            }
        }

    }
    /**
     * @throws Exception
     */
    public static function allowed(int $entreprise = null): void
    {
        global $_TOKEN;
        if ($_TOKEN->user_role==0){
            throw new Exception('{message:"not allowed"}', 403);
        }
    }

    /**
     * @throws Exception
     */
    public static function rh(): void
    {
        global $_TOKEN;
        if ($_TOKEN->user_role<3){
            throw new Exception('{message:"only rh or higher allowed"}', 403);
        }
    }

    /**
     * @throws Exception
     */
    public static function forbidden(): void
    {
        throw new Exception('{message:"not allowed"}', 403);
    }

    /**
     * @throws Exception
     */
    public static function volunteer()
    {
        global $_TOKEN;
        if ($_TOKEN->user_role<2){
            throw new Exception('{message:"only volunteer or higher allowed"}', 403);
        }
    }
}