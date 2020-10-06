<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateServicegroupTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('servicegroup', function(Blueprint $table)
		{
			$table->increments('Id');
			$table->integer('CategoryId')->nullable();
			$table->integer('SubCategoryId')->nullable();
			$table->string('Name', 50)->default('');
			$table->string('Image')->nullable();
			$table->boolean('Status')->default(1);
			$table->timestamp('CreateAt')->default(DB::raw('CURRENT_TIMESTAMP'));
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
		Schema::drop('servicegroup');
	}

}
