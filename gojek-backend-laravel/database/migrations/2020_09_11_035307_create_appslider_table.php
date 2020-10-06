<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAppsliderTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('appslider', function(Blueprint $table)
		{
			$table->bigInteger('Id', true);
			$table->string('Title', 45)->nullable();
			$table->string('Description')->nullable();
			$table->string('Image')->nullable();
			$table->string('Type', 10)->nullable()->default('user');
			$table->timestamp('CreateAt')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'));
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
		Schema::drop('appslider');
	}

}
