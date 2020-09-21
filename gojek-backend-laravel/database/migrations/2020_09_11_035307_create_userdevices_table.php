<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUserdevicesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('userdevices', function(Blueprint $table)
		{
			$table->bigInteger('Id', true);
			$table->bigInteger('UserId');
			$table->string('Brand')->nullable()->default('');
			$table->string('Model')->nullable()->default('');
			$table->string('DeviceId')->unique('DeviceId_UNIQUE');
			$table->text('GCMId')->nullable();
			$table->text('AccessToken')->nullable();
			$table->string('AppVersion', 10)->nullable()->default('');
			$table->string('OS', 10)->nullable()->default('');
			$table->string('OSVersion', 10)->nullable()->default('');
			$table->float('Latitude', 10, 6)->nullable();
			$table->float('Longitude', 10, 6)->nullable();
			$table->string('SocketId')->nullable();
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
		Schema::drop('userdevices');
	}

}
