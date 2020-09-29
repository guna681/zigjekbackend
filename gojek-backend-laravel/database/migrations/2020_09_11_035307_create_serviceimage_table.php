<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateServiceimageTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('serviceimage', function(Blueprint $table)
		{
			$table->increments('Id');
			$table->integer('ServiceId')->nullable();
			$table->string('Path')->nullable();
			$table->string('URL')->nullable();
			$table->string('Type')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('serviceimage');
	}

}
