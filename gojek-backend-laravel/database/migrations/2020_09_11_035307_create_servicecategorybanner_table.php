<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateServicecategorybannerTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('servicecategorybanner', function(Blueprint $table)
		{
			$table->increments('Id');
			$table->integer('CategoryId')->nullable();
			$table->integer('SubCategoryId')->nullable();
			$table->string('Text', 50)->nullable();
			$table->string('Type', 50)->nullable();
			$table->string('Path')->nullable();
			$table->string('URL')->nullable();
			$table->integer('Status')->default(1);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('servicecategorybanner');
	}

}
