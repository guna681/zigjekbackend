<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateRidetypelanguageTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('ridetypelanguage', function(Blueprint $table)
		{
			$table->integer('Id', true);
			$table->integer('LanguageId')->nullable();
			$table->string('Name')->nullable();
			$table->integer('RideTypeId')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('ridetypelanguage');
	}

}
