<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOrdertabTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('ordertab', function(Blueprint $table)
		{
			$table->increments('Id');
			$table->string('Type', 50)->nullable();
			$table->string('Name', 50)->nullable();
			$table->string('Path', 50)->nullable();
			$table->string('Key', 50)->nullable();
			$table->string('UserType', 50)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('ordertab');
	}

}
