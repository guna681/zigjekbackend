<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateOutletMenucategoriesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('outlet_menucategories', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('restaurantId')->unsigned()->nullable()->index('outlet_menucategories_restaurantid_index');
			$table->integer('outletId')->unsigned()->index('outlet_menucategories_outletid_index');
			$table->string('name');
			$table->string('description');
			$table->boolean('status');
			$table->boolean('parentId')->default(0);
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
		Schema::drop('outlet_menucategories');
	}

}
