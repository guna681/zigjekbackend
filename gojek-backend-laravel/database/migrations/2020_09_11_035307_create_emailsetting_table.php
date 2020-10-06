<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateEmailsettingTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('emailsetting', function(Blueprint $table)
		{
			$table->increments('id');
			$table->string('templateName', 800);
			$table->text('template');
			$table->string('Token')->nullable();
			$table->string('key')->nullable();
			$table->boolean('status')->default(0);
			$table->boolean('default')->nullable()->default(0);
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
		Schema::drop('emailsetting');
	}

}
