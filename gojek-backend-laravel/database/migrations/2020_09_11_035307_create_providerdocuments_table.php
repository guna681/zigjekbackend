<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateProviderdocumentsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('providerdocuments', function(Blueprint $table)
		{
			$table->integer('id', true);
			$table->integer('DocTypeId');
			$table->bigInteger('ProviderId');
			$table->string('Value')->nullable()->default('');
			$table->string('Status', 10);
			$table->string('file');
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
		Schema::drop('providerdocuments');
	}

}
