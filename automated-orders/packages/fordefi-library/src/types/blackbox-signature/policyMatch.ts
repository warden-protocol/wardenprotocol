export interface PolicyMatch {
  /** True if this is the default rule, False otherwise. */
  is_default: boolean;
  /** The unique identifier of the rule. */
  rule_id: string;
  /** The name of the rule. */
  rule_name: string;
  /** The action taken in the event of a policy match. */
  action_type: 'allow' | 'block' | 'require_approval';
}
