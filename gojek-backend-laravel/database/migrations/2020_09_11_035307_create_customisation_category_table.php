<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCustomisationCategoryTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('customisation_category', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('name');
			$table->integer('outletId')->unsigned()->index('customisation_category_outletid_foreign');
			$table->string('type');
			$table->boolean('status')->default(0);
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
		Schema::drop('customisation_category');
	}

}
