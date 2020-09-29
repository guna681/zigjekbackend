<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateAddressTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('address', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('userId');
			$table->string('location');
			$table->string('houseFlatNo')->default('');
			$table->string('landMark')->default('');
			$table->string('fullAddress', 500)->nullable();
			$table->string('type', 100)->nullable();
			$table->boolean('unSaved')->default(0);
			$table->float('latitude', 20, 15);
			$table->float('longitude', 20, 15);
			$table->integer('addressType')->nullable();
			$table->integer('currentAddress')->default(0);
			$table->boolean('isDeleted')->nullable()->default(0);
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
		Schema::drop('address');
	}

}
