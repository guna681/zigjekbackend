<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAppconfigTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('appconfig', function(Blueprint $table)
		{
			$table->integer('Id', true);
			$table->string('FieldName', 100)->nullable();
			$table->string('Value')->nullable();
			$table->string('Type', 10)->nullable()->default('provider');
			$table->dateTime('CreateAt')->nullable();
			$table->dateTime('UpdateAt')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('appconfig');
	}

}
