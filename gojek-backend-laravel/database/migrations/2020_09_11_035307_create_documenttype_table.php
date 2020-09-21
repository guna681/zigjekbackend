<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateDocumenttypeTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('documenttype', function(Blueprint $table)
		{
			$table->integer('Id', true);
			$table->string('Name');
			$table->string('Type', 45)->nullable();
			$table->string('FieldName')->nullable();
			$table->string('ApplicableTo', 45)->nullable();
			$table->boolean('IsRequired')->default(1);
			$table->string('DocType', 50)->nullable();
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('documenttype');
	}

}
