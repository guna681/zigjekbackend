<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateProvidervehicledocumentTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('providervehicledocument', function(Blueprint $table)
		{
			$table->integer('Id', true);
			$table->bigInteger('ProviderId')->nullable();
			$table->integer('ProviderVehicleId')->nullable();
			$table->integer('DocumentTypeId')->nullable();
			$table->string('File')->nullable();
			$table->string('Value', 100)->nullable();
			$table->boolean('Status')->nullable();
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
		Schema::drop('providervehicledocument');
	}

}
