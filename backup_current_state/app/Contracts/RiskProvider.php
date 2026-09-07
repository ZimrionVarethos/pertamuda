<?php

namespace App\Contracts;

use App\Models\Asset;
use App\Models\RiskAssessment;
use Carbon\CarbonInterface;

interface RiskProvider
{
    /**
     * Evaluate risk for an asset at a given evaluation time.
     */
    public function evaluate(Asset $asset, ?CarbonInterface $evaluationTime = null): RiskAssessment;
}
