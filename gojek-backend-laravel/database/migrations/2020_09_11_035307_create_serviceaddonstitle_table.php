<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateServiceaddonstitleTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('serviceaddonstitle', function(Blueprint $table)
		{
			$table->integer('Id', true);
			$table->integer('CategoryId')->nullable();
			$table->integer('SubCategoryId')->nullable();
			$table->integer('GroupId')->nullable();
			$table->string('Name');
			$table->string('Type', 11)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('serviceaddonstitle');
	}

}
