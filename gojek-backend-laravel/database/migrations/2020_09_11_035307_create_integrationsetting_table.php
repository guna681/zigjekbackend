<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateIntegrationsettingTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('integrationsetting', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('name');
			$table->string('key');
			$table->string('value');
			$table->string('type');
			$table->string('image')->nullable();
			$table->boolean('status')->default(0);
			$table->timestamps();
			$table->string('paymentType', 45)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('integrationsetting');
	}

}
