<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateRidevehicletypelanguageTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('ridevehicletypelanguage', function(Blueprint $table)
		{
			$table->integer('Id', true);
			$table->integer('LanguageId')->nullable();
			$table->integer('RideVechileType')->nullable();
			$table->string('Name', 45)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('ridevehicletypelanguage');
	}

}
