<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAdminaccessTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('adminaccess', function(Blueprint $table)
		{
			$table->integer('Id', true);
			$table->string('Modules', 45)->nullable();
			$table->string('Roles', 45)->nullable();
			$table->string('HasAccess', 3)->nullable()->default('No');
			$table->integer('AdminId')->nullable();
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
		Schema::drop('adminaccess');
	}

}
