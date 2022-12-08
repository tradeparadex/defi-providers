import formatter from '../../../../util/formatter';
import uniswapV2 from '../../../../util/calculators/uniswapV2';
import {
  ITvlParams,
  ITvlBalancesReturn,
  ITvlBalancesPoolBalancesReturn,
} from '../../../../interfaces/ITvl';

const START_BLOCK = 55447057;
const FACTORY_ADDRESS = '0xC5E1DaeC2ad401eBEBdd3E32516d90Ab251A3aA3';

async function tvl(
  params: ITvlParams,
): Promise<
  ITvlBalancesReturn | ITvlBalancesPoolBalancesReturn | Record<string, never>
> {
  const { block, chain, provider } = params;

  if (block < START_BLOCK) {
    return {};
  }

  const { balances, poolBalances } = await uniswapV2.getTvl(
    FACTORY_ADDRESS,
    block,
    chain,
    provider,
  );

  formatter.convertBalancesToFixed(balances);

  return { balances, poolBalances };
}

export { tvl };
