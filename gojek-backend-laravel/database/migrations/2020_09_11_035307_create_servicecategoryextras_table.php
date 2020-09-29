<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateServicecategoryextrasTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('servicecategoryextras', function(Blueprint $table)
		{
			$table->integer('Id', true);
			$table->integer('CategoryId')->nullable();
			$table->integer('SubCategoryId')->nullable();
			$table->string('Icon');
			$table->string('Text');
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
		Schema::drop('servicecategoryextras');
	}

}
