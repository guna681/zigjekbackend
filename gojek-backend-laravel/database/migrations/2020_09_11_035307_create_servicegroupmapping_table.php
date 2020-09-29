<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateServicegroupmappingTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('servicegroupmapping', function(Blueprint $table)
		{
			$table->integer('Id', true);
			$table->integer('GroupId')->nullable();
			$table->integer('ServiceId')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('servicegroupmapping');
	}

}
