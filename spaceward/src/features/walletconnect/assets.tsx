import type { LucideProps } from "lucide-react";

export const Assets = {
	qrTarget: ({ locked, ...props }: LucideProps & { locked?: boolean }) => (
		<svg
			width="282"
			height="282"
			viewBox="0 0 282 282"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<g clipPath="url(#clip0_3308_168178)">
				{locked ? (
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M117.705 117.705C118.144 117.265 118.856 117.265 119.295 117.705L164.295 162.704C164.735 163.144 164.735 163.856 164.295 164.295C163.856 164.735 163.144 164.735 162.704 164.295L158.534 160.125H123C121.508 160.125 120.077 159.532 119.023 158.477C117.968 157.422 117.375 155.992 117.375 154.5V134.25C117.375 132.758 117.968 131.327 119.023 130.272C120.077 129.218 121.508 128.625 123 128.625H127.034L117.705 119.295C117.265 118.856 117.265 118.144 117.705 117.705ZM129.284 130.875H123C122.105 130.875 121.246 131.231 120.614 131.863C119.981 132.496 119.625 133.355 119.625 134.25V154.5C119.625 155.395 119.981 156.253 120.614 156.886C121.246 157.519 122.105 157.875 123 157.875H156.284L146.826 148.417C146.775 148.554 146.696 148.683 146.589 148.795C145.866 149.56 144.997 150.172 144.033 150.595C143.069 151.018 142.03 151.243 140.978 151.258C139.925 151.273 138.881 151.076 137.905 150.68C136.93 150.284 136.044 149.697 135.3 148.952C134.556 148.208 133.968 147.322 133.572 146.347C133.176 145.372 132.979 144.327 132.994 143.274C133.009 142.222 133.234 141.183 133.657 140.219C134.08 139.255 134.692 138.386 135.457 137.663C135.57 137.556 135.699 137.477 135.835 137.426L129.284 130.875ZM137.284 138.875C137.226 139.03 137.132 139.175 137.003 139.297C136.457 139.814 136.02 140.435 135.718 141.123C135.415 141.812 135.254 142.554 135.244 143.306C135.233 144.057 135.374 144.804 135.657 145.5C135.94 146.197 136.359 146.83 136.891 147.361C137.423 147.893 138.055 148.313 138.752 148.595C139.449 148.878 140.195 149.019 140.947 149.008C141.698 148.998 142.44 148.837 143.129 148.535C143.817 148.232 144.438 147.795 144.955 147.249C145.077 147.12 145.222 147.027 145.377 146.968L137.284 138.875ZM134.25 123C134.25 122.379 134.754 121.875 135.375 121.875H146.625C146.959 121.875 147.275 122.023 147.489 122.28L152.777 128.625H159C160.492 128.625 161.922 129.218 162.977 130.272C164.032 131.327 164.625 132.758 164.625 134.25V151.125C164.625 151.746 164.121 152.25 163.5 152.25C162.879 152.25 162.375 151.746 162.375 151.125V134.25C162.375 133.355 162.019 132.496 161.386 131.863C160.753 131.231 159.895 130.875 159 130.875H152.25C151.916 130.875 151.599 130.727 151.386 130.47L146.098 124.125H135.375C134.754 124.125 134.25 123.621 134.25 123Z"
						fill="#E5EEFF"
						fillOpacity="0.6"
					/>
				) : null}
				<path
					d="M2 59V18C2 9.16345 9.16344 2 18 2H59"
					stroke="#E5EEFF"
					strokeOpacity="0.6"
					strokeWidth="4"
				/>
				<path
					d="M281 223V264C281 272.837 273.837 280 265 280H224"
					stroke="#E5EEFF"
					strokeOpacity="0.6"
					strokeWidth="4"
				/>
				<path
					d="M281 59V18C281 9.16345 273.837 2 265 2H224"
					stroke="#E5EEFF"
					strokeOpacity="0.6"
					strokeWidth="4"
				/>
				<path
					d="M2 223V264C2 272.837 9.16344 280 18 280H59"
					stroke="#E5EEFF"
					strokeOpacity="0.6"
					strokeWidth="4"
				/>
			</g>
			<defs>
				<clipPath id="clip0_3308_168178">
					<path
						d="M0 16C0 7.16345 7.16344 0 16 0H266C274.837 0 282 7.16344 282 16V266C282 274.837 274.837 282 266 282H16C7.16345 282 0 274.837 0 266V16Z"
						fill="white"
					/>
				</clipPath>
			</defs>
		</svg>
	),
	approveDoc: (props: LucideProps) => (
		<svg
			width="22"
			height="23"
			viewBox="0 0 22 23"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<g id="icon/file-signature">
				<g id="Union">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M5.33355 3.00022C4.97993 3.00022 4.64079 3.14069 4.39074 3.39074C4.14069 3.64079 4.00022 3.97993 4.00022 4.33355V18.5558C4.00022 18.9094 4.14069 19.2485 4.39074 19.4986C4.64079 19.7486 4.97993 19.8891 5.33355 19.8891H16.0002C16.3538 19.8891 16.693 19.7486 16.943 19.4986C17.1931 19.2485 17.3336 18.9094 17.3336 18.5558V18.1113C17.3336 17.8659 17.5325 17.6669 17.778 17.6669C18.0235 17.6669 18.2224 17.8659 18.2224 18.1113V18.5558C18.2224 19.1451 17.9883 19.7104 17.5716 20.1271C17.1548 20.5439 16.5896 20.778 16.0002 20.778H5.33355C4.74418 20.778 4.17895 20.5439 3.7622 20.1271C3.34545 19.7104 3.11133 19.1451 3.11133 18.5558V4.33355C3.11133 3.74418 3.34545 3.17895 3.7622 2.7622C4.17895 2.34545 4.74418 2.11133 5.33355 2.11133H12.8891C13.007 2.11133 13.12 2.15815 13.2034 2.2415L16.3145 5.35261C16.4881 5.52618 16.4881 5.80759 16.3145 5.98115C16.1409 6.15472 15.8595 6.15472 15.6859 5.98115L12.705 3.00022H5.33355Z"
						fill="white"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M6.66688 16.778C6.66688 16.5325 6.86587 16.3335 7.11133 16.3335H8.00022C8.24568 16.3335 8.44466 16.5325 8.44466 16.778C8.44466 17.0235 8.24568 17.2224 8.00022 17.2224H7.11133C6.86587 17.2224 6.66688 17.0235 6.66688 16.778Z"
						fill="white"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M17.6936 9.2179C17.5068 9.2179 17.3218 9.25469 17.1493 9.32617C16.9768 9.3976 16.8201 9.50228 16.6881 9.63423V9.63423L12.8371 13.4939L12.1677 16.1646L14.8397 15.4882L18.6993 11.6459V11.6459C18.8312 11.5139 18.9362 11.3569 19.0076 11.1845C19.0791 11.0119 19.1159 10.827 19.1159 10.6402C19.1159 10.4534 19.0791 10.2685 19.0076 10.0959C18.9361 9.92336 18.8314 9.76656 18.6993 9.63449C18.5672 9.50241 18.4104 9.39764 18.2378 9.32617C18.0653 9.25469 17.8803 9.2179 17.6936 9.2179ZM16.8091 8.50494C17.0895 8.38879 17.39 8.32901 17.6936 8.32901C17.9971 8.32901 18.2976 8.38879 18.578 8.50494C18.8584 8.62109 19.1132 8.79133 19.3278 9.00595C19.5424 9.22056 19.7127 9.47535 19.8288 9.75576C19.945 10.0362 20.0048 10.3367 20.0048 10.6402C20.0048 10.9437 19.945 11.2443 19.8288 11.5247C19.7127 11.8051 19.5424 12.0599 19.3278 12.2745L19.3271 12.2752L15.3804 16.2041C15.3239 16.2604 15.2533 16.3004 15.176 16.32L11.6648 17.2088C11.5132 17.2472 11.3526 17.2031 11.2419 17.0926C11.1312 16.9822 11.0866 16.8217 11.1247 16.6699L12.0047 13.1588C12.0242 13.0809 12.0644 13.0098 12.1211 12.953L16.0589 9.0063C16.2735 8.79169 16.5287 8.62109 16.8091 8.50494Z"
						fill="white"
					/>
				</g>
			</g>
		</svg>
	),
};
