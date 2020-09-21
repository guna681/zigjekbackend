<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUserlogsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('userlogs', function(Blueprint $table)
		{
			$table->integer('Id', true);
			$table->string('action', 45)->nullable();
			$table->string('Module', 45)->nullable();
			$table->text('data')->nullable();
			$table->bigInteger('UserId')->nullable();
			$table->bigInteger('UserDeviceId')->nullable();
			$table->timestamp('CreateAt')->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->timestamp('UpdateAt')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'));
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('userlogs');
	}

}
