<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateProviderotpTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('providerotp', function(Blueprint $table)
		{
			$table->integer('Id', true);
			$table->string('Mobile', 15)->nullable();
			$table->string('ExtCode', 5)->nullable();
			$table->integer('OTP')->nullable();
			$table->string('Type', 50)->nullable();
			$table->string('Status', 10)->nullable()->default('pending');
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
		Schema::drop('providerotp');
	}

}
