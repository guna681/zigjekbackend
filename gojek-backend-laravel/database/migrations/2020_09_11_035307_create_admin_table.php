<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAdminTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('admin', function(Blueprint $table)
		{
			$table->integer('Id', true);
			$table->string('FirstName', 45)->nullable();
			$table->string('LastName', 45)->nullable();
			$table->string('Username')->nullable();
			$table->string('Email')->nullable();
			$table->string('Password')->nullable();
			$table->integer('Roles')->nullable();
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
		Schema::drop('admin');
	}

}
