<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateServicecategorytitleTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('servicecategorytitle', function(Blueprint $table)
		{
			$table->increments('Id');
			$table->integer('CategoryId')->nullable();
			$table->integer('SubCategoryId')->nullable();
			$table->string('Title', 100)->nullable();
			$table->integer('Status')->nullable()->default(1);
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('servicecategorytitle');
	}

}
