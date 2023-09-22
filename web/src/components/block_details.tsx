import { BlockResponseParsed } from "@/client/chain";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatDateTime } from "@/lib/datetime";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import TxDetails from "./tx_details";

function BlockDetails({ block }: { block: BlockResponseParsed }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Block info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Row label="Hash">{block.block_id.hash}</Row>
        <Row label="Height">{block.block.header.height}</Row>
        <Row label="Timestamp">{formatDateTime(block.block.header.time)}</Row>
        <Row label="Transactions">{block.block.data.txs.length} txs</Row>

        <div className="flex flex-row gap-4 pt-8">
          <Link to={`/explorer/block_by_height/${-1 + parseInt(block.block.header.height, 10)}`}>
            <Button variant="secondary">
              Previous block
            </Button>
          </Link>
          <Link to={`/explorer/block_by_height/${1 + parseInt(block.block.header.height, 10)}`}>
            <Button variant="secondary">
              Next block
            </Button>
          </Link>
        </div>

        <div>
          {
            block.block.data.txs.map((tx, i) => (
              <TxDetails key={tx.hash} index={i} tx={tx} />
            ))
          }
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
      </CardFooter>
    </Card>
  );
}

function Row({ label, children }: { label: string, children: React.ReactNode }) {
  return (
    <div className="flex flex-row gap-4 items-center">
      <span className="font-bold text-sm w-[100px]">{label}</span>
      <span>{children}</span>
    </div>
  );
}

export default BlockDetails;
