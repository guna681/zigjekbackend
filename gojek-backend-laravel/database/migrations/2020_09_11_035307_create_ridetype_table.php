<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateRidetypeTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('ridetype', function(Blueprint $table)
		{
			$table->integer('Id', true);
			$table->string('Name', 45)->nullable();
			$table->string('Description')->nullable();
			$table->integer('CountryId')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('ridetype');
	}

}
