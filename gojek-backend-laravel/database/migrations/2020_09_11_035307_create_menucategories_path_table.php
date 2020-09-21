<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMenucategoriesPathTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('menucategories_path', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('categoryId');
			$table->integer('pathId');
			$table->integer('level');
			$table->softDeletes();
			$table->timestamps();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('menucategories_path');
	}

}
