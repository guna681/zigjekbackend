<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateEmailtemplateTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('emailtemplate', function(Blueprint $table)
		{
			$table->integer('Id', true);
			$table->string('KeyWord', 50)->nullable();
			$table->string('Type', 45)->nullable();
			$table->text('Template')->nullable();
			$table->timestamp('CreateAt')->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->timestamp('UpdateAt')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'));
			$table->text('Variables')->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('emailtemplate');
	}

}
