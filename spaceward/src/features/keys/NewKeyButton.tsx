import { Button } from "../../components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../../components/ui/sheet";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { useSpaceId } from "@/hooks/useSpaceId";
import useKeychainId from "@/hooks/useKeychainId";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAddressContext } from "@/hooks/useAddressContext";
import useWardenWardenV1Beta2 from "@/hooks/useWardenWardenV1Beta2";
import { KeyRequestDialog } from "./KeyRequestDialog";
import useRequestKey from "@/hooks/useRequestKey";
import { KeyIcon } from "lucide-react";

const FormSchema = z.object({});

export function NewKeyButton() {
	const { address } = useAddressContext();
	const [keychainId, setKeychainId] = useKeychainId();
	const { spaceId } = useSpaceId();

	const { state, error, keyRequest, requestKey, reset } = useRequestKey();

	const { QueryKeychains } = useWardenWardenV1Beta2();
	const q = QueryKeychains({}, {}, 10);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	return (
		<>
			<KeyRequestDialog
				state={state}
				error={error}
				keyRequest={keyRequest}
				reset={reset}
			/>

			<Sheet>
				<SheetTrigger asChild>
					<Button size={"sm"}>Create key</Button>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle className="text-display text-3xl my-4">
							New key
						</SheetTitle>
					</SheetHeader>

					<div className="grid gap-4 py-4">
						<Form {...form}>
							<div className="flex flex-col gap-4">
								<FormField
									control={form.control}
									name="keychain"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Keychain</FormLabel>
											<Select
												onValueChange={(value) =>
													field.onChange(
														setKeychainId(value),
													)
												}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select a keychain" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{q.data?.pages.flatMap(
														(page) =>
															page.keychains?.map(
																(kr) =>
																	kr.id !==
																		"3" && (
																		<SelectItem
																			key={
																				kr.id
																			}
																			value={
																				kr.id!
																			}
																		>
																			{
																				kr.description
																			}
																		</SelectItem>
																	),
															),
													)}
												</SelectContent>
											</Select>
										</FormItem>
									)}
								/>
							</div>
						</Form>
					</div>

					<SheetFooter>
						<SheetClose asChild>
							<Button
								type="submit"
								disabled={!keychainId || !spaceId}
								onClick={() =>
									requestKey(keychainId!, address, spaceId!)
								}
								className="flex flex-row gap-4 w-full"
							>
								<KeyIcon className="h-5 w-5" />
								Create
							</Button>
						</SheetClose>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</>
	);
}
