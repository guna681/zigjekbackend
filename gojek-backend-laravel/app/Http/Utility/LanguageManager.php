<?php

namespace  App\Http\Utility;


use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Str;

use File;

Class LanguageManager
{




    protected $filesystem;

    /*
     * @var string
     */
    protected $languagesPath;




    /*
     * File System Interface
     * @Param Filesystem $fileSystem
     */
    public function __construct()
    {
        $this->fileSystem = new Filesystem();
    }



    public function getLanguagePath()
    {
        return $this->languagePath =base_path().'/resources/lang/';
    }




    /**
     * Create a new directory under the languages directory for input locale.
     * Return true on success.
     *
     * @param  string $newLocale
     *
     * @return bool
     */

    public function createNewLanguage($newLocale)
    {
         //check exist or not File
        if(!$this->fileSystem->exists($newLocale)){

            $this->fileSystem->makeDirectory($this->getLanguagePath() . DIRECTORY_SEPARATOR . $newLocale);
            return true;
        }

        return false;
    }


    public function writeLanguageFile($locale,$input)
    {

        $fileName = "validation";
        $inputs = $this->buildArray($input);

        $filePath = $this->getLanguagePath().$locale. DIRECTORY_SEPARATOR . $fileName . '.php';
        //File Syntax in array
        $content = '<?php ' . PHP_EOL . PHP_EOL . 'return ' . $inputs;
        $this->fileSystem->put($filePath, $content);
        return true;

    }


    public function deleteLanguagesDirectory($locale){


        if(!$this->fileSystem->exists($locale)){

            $this->fileSystem->deleteDirectory($this->getLanguagePath() . DIRECTORY_SEPARATOR . $locale);
            return true;
        }

        return false;

    }



    public function  buildArray($arr, $pad = 0, $padStr = "\t"){
        $outerPad = $pad;
        $innerPad = $pad + 1;
        $out = '[' . PHP_EOL;
        foreach ($arr as $k => $v) {
            if (is_array($v)) {
                $out .= str_repeat($padStr, $innerPad) ."'". $k . "'". ' => '.$this->subarray($v, $innerPad) . PHP_EOL;

            } else {
                $out .= str_repeat($padStr, $innerPad) ."'". $k . "'". ' => '. "'". $v ."'".',';
                $out .= PHP_EOL;
            }
        }
        $out .= str_repeat($padStr, $outerPad) . '];';

        return $out;
    }

    public function subarray($arr, $pad = 0, $padStr = "\t"){
        $outerPad = $pad;
        $innerPad = $pad + 1;
        $out = '[' . PHP_EOL;
        foreach ($arr as $k => $v) {
            if (is_array($v)) {
                $out .= str_repeat($padStr, $innerPad)."'". $k . "'".  ' => '.$this->minarray($v, $innerPad)  . PHP_EOL;


            } else {
                $out .= str_repeat($padStr, $innerPad) ."'". $k . "'".  ' => '. "'". $v ."'".',';
                $out .= PHP_EOL;
            }
        }
        $out .= str_repeat($padStr, $outerPad) . '],';



        return $out;
    }



    public function minarray($arr, $pad = 0, $padStr = "\t"){
        $outerPad = $pad;
        $innerPad = $pad + 1;
        $out = '[' . PHP_EOL;
        foreach ($arr as $k => $v) {
            if (is_array($v)) {
                $out .= str_repeat($padStr, $innerPad)."'". $k . "'".  ' => '.$this->subarray($v, $innerPad)  . PHP_EOL;


            } else {
                $out .= str_repeat($padStr, $innerPad) ."'". $k . "'".  ' => '. "'". $v ."'".',';
                $out .= PHP_EOL;
            }
        }
        $out .= str_repeat($padStr, $outerPad) . '],';



        return $out;
    }


    public function buildValue($value,$rules)
    {


        $attributeExist = str_contains($rules,':attribute');

        if ($attributeExist) {
            $value = Str::start($value, ':attribute  ');
        }
        $dateExist = str_contains($rules,':date');
        if($dateExist){
            $value  = $value .' :date.';
        }
        $minMaxExist =str_contains($rules,':min and :max');

        if($minMaxExist){
            $value = $value.':min and :max .';
        }else{
            $minExist = Str_contains($rules,':min');
            if($minExist){
                $value  = $value.':min';
            }

        }
        $valuesExist = str_contains($rules,':values');

        if($valuesExist){
            $value = $value." :values";
        }

        $otherExist =str_contains($rules,':other');

        if($otherExist){
            $value = $value." :other";
        }

        return $value;

    }




}
